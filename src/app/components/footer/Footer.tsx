import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-10 md:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Lamborghini</h2>
            <p className="leading-relaxed text-gray-700">1 ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat gravida dolor sit amet fringilla. Suspendisse potenti.</p>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-10 md:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Ferrari</h2>
            <p className="leading-relaxed text-gray-700">2 ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat gravida dolor sit amet fringilla. Suspendisse potenti.</p>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-10 md:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Mercedes</h2>
            <p className="leading-relaxed text-gray-700">3 ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat gravida dolor sit amet fringilla. Suspendisse potenti.</p>
          </div>
        </div>
        <div className="bg-gray-200 mt-20">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 Corporation —</p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">drive safely with Entreprise Car</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
