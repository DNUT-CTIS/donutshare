// propsla içeriği baslanıcak buttonlar isteğe göre atılır. peki isteği propla alabilir miyiz veya iyi bir practiccem i

//ACtionı componentda tutup viewı modalda yapabiliriz
export function WarningModal() {


  return(
    <div className="relative w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-zinc-800">
        <button type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal">
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-6 text-center">
          <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
               stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to report?</h3>
        </div>
      </div>
    </div>
);
}
