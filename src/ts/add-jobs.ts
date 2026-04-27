import { ApiError } from "./classes/api-error";
import type { Employment } from "./interfaces/employment";

/**
 * @function addJobs
 * @description Imports user inputs and validates said data before post-request. 
 */
export async function addJobs() {
  const form = document.querySelector<HTMLFormElement>('.add-form'); 
  
  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const data: Employment = {
      company_name: document.querySelector<HTMLInputElement>('#name')?.value as string,
      job_title: document.querySelector<HTMLInputElement>('#title')?.value as string,
      location: document.querySelector<HTMLInputElement>('#location')?.value as string,
      start_date: document.querySelector<HTMLInputElement>('#start-date')?.value as string,
      end_date: document.querySelector<HTMLInputElement>('#end-date')?.value as string,
      description: document.querySelector<HTMLTextAreaElement>('#description')?.value as string
    }
    
    const messageArray: Array<string> = [];
    isInputEmpty(data.company_name, 'Företagsnamn får inte vara tomt', messageArray);
    isInputEmpty(data.job_title, 'Roll får inte vara tomt', messageArray);
    isInputEmpty(data.location, 'Plats får inte vara tomt', messageArray);
    isInputEmpty(data.start_date, 'Startdatum får inte vara tomt', messageArray);

    if (messageArray.length > 0) {
      const messageList = document.querySelector<HTMLUListElement>('.message-list');
      messageList?.replaceChildren();
      messageArray.forEach(message => {
        const li = document.createElement('li');
        li.textContent = message;
        messageList?.append(li);
      });
      return;
    }

    saveJob(data);

  });

  const reset = document.querySelector<HTMLButtonElement>('.reset-button');
  reset?.addEventListener('click', () => {
    const messageList = document.querySelector<HTMLUListElement>('.message-list');
    messageList?.replaceChildren();
  })
}

/**
 * @function saveJob
 * @description Saves data to database through a post-request.
 * @param data Object containing data to save.
 */
async function saveJob(data: Employment): Promise<void> {
  try {
    const response = await fetch('https://api.clr-server.com/employments/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
  
      throw new ApiError(
        errorData.message || `Couldn't save data`,
        response.status,
        errorData.error
      );

    } else {
      const messageList = document.querySelector<HTMLUListElement>('.message-list');
      messageList?.replaceChildren();
      const li = document.createElement('li');
      li.classList.add('green');
      li.textContent = 'Jobbet har sparats!';
      messageList?.appendChild(li);

      const form = document.querySelector<HTMLFormElement>('.add-form');
      form?.reset();
    }
  } catch (error: any) {
    console.error("Status:", error.status);
    console.error("Error:", error.type);
    console.error("Message:", error.message);
    alert(error.message);

    const messageList = document.querySelector<HTMLUListElement>('.message-list');
    messageList?.replaceChildren();
    const li = document.createElement('li');
    li.textContent = 'Från servern: ' + error.message;
    messageList?.appendChild(li);
  }
}

/**
 * @function isInputEmpty
 * @description Checks if input is empty and adds warning message to an array.
 * @param input Input to check.
 * @param message Message to add to array in case of empty input.
 * @param array Array to store messsages.
 */
function isInputEmpty(input: string, message: string, array: Array<string>) {
if(!input || input.trim() === "") {
    array.push(message);    
  }
}