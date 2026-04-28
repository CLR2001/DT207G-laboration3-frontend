import { ApiError } from "./classes/api-error";
import type { Employment } from "./interfaces/employment";

/**
 * @function renderJobs
 * @description Creates HTMLElements for each document fetched from database and renders to DOM.
 */
export async function renderJobs() {
  const container = document.querySelector<HTMLElement>('.job-section');
  container?.replaceChildren();

  try {
    const spinner = createDomElement('span');
    spinner.classList.add('spinner');
    container?.append(spinner);
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(5000);
    const response = await fetch('https://lab3.api.clr-server.com/employments');
    
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
      console.log(job._id);
      
      const div = createDomElement('div');
      div.classList.add('job-container');
      const name = createDomElement('h2', job.company_name);
      const title = createDomElement('p', `Roll: ${job.job_title}`);
      const location = createDomElement('p', `Plats: ${job.location}`);

      const dateDiv = createDomElement('div');
      dateDiv.classList.add('date-container');
      const startDate = new Date(job.start_date).toISOString().split('T')[0];
      const endDate = job.end_date === null
          ? 'tillsvidare'
          : new Date(job.end_date as string).toISOString().split('T')[0];
      dateDiv. append(createDomElement('p', `Period: ${startDate} - ${endDate}`));
      
      const description = createDomElement('p', job.description);

      const buttonContainer = createDomElement('div');
      buttonContainer.classList.add('button-container');
      const removeButton = createDomElement('button', 'Radera');
      removeButton.classList.add('remove-button');

      removeButton.addEventListener('click', async () => {
        const userConfirm = confirm('Vill du verkligen radera detta jobb från databasen?');
        if(userConfirm) {
          await deleteJob(job._id as string, div);
          
          if (container?.children.length === 0) {
            container?.append(createDomElement('p', 'Du har inga sparade jobb'));
          }
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
  } finally {
    const spinner = document.querySelector('.spinner');
    spinner?.remove();
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
async function deleteJob(id: string, element: HTMLElement): Promise<void> {
  try {
    const response = await fetch (`https://lab3.api.clr-server.com/employments/${id}`, {
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