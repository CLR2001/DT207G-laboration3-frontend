import { ApiError } from "./classes/api-error";
import type { Employment } from "./interfaces/employment";

/**
 * @function renderJobs
 * @description Creates HTMLElements for each row fetched from database and renders to DOM.
 */
export async function renderJobs() {
  const container = document.querySelector<HTMLElement>('.job-section');
  container?.replaceChildren();

  try {
  const response = await fetch('https://api.clr-server.com/employments');
  
  if (!response.ok) {
    const errorData = await response.json();

    throw new ApiError(
      errorData.message || `Couldn't fetch data`,
      response.status,
      errorData.error
    );
  }

  const data: Employment[] = await response.json();

  if (data.length === 0) {
    container?.append(createDomElement('p', 'Du har inga sparade jobb'));
  }

  data.forEach((job: Employment) => {
    const div = createDomElement('div');
    div.classList.add('job-container');
    const name = createDomElement('h2', job.company_name);
    const title = createDomElement('p', `Roll: ${job.job_title}`);
    const location = createDomElement('p', `Plats: ${job.location}`);
    const dateDiv = createDomElement('div');
    dateDiv. append(createDomElement('p', `Period: ${job.start_date} - ${job.end_date || 'tillsvidare'}`))
    dateDiv.classList.add('date-container');
    const description = createDomElement('p', job.description);

    const buttonContainer = createDomElement('div');
    buttonContainer.classList.add('button-container');
    const removeButton = createDomElement('button', 'Radera');
    removeButton.classList.add('remove-button');

    removeButton.addEventListener('click', () => {
      const userConfirm = confirm('Vill du verkligen radera detta jobb från databasen?');
      if(userConfirm) {
        deleteJob(job.id as number, div);
      }
    });

    buttonContainer.append(removeButton);
    
    div.append(name, title, location, dateDiv, description, buttonContainer);

    container?.append(div);
  });
  
  
  } catch (error: any) {
    console.error("Status:", error.status);
    console.error("Error:", error.type);
    console.error("Message:", error.message);
    alert(error.message);
  }
}

/**
 * @function createDomElement
 * @description Creates and returns an HTML element.
 */
function createDomElement(tag: string, text: string = ''): HTMLElement {
  const e = document.createElement(tag);
  e.textContent = text;
  return e;
}

/**
 * @function deleteJob
 * @description Deletes an HTMLElement and sends a delete-request to database.
 * @param id ID to delete from database.
 * @param element HTMLElement to remove from DOM.
 */
async function deleteJob(id: number, element: HTMLElement): Promise<void> {
  try {
    const response = await fetch (`https://api.clr-server.com/employments/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorData = await response.json();
  
      throw new ApiError(
        errorData.message || `Couldn't delete data`,
        response.status,
        errorData.error
      );
    } else {
      element.remove();
    }
  } catch (error: any) {
    console.error("Status:", error.status);
    console.error("Error:", error.type);
    console.error("Message:", error.message);
    alert(error.message);
  }
}