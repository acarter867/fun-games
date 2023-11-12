import React, { useState } from 'react';

const HomeModal = ({ showModal, setShowModal }) => {
  const [isCreateSession, setIsCreateSession] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    console.log("shit done got submitted");
    closeModal();
    if (isCreateSession === 0) {
      // create new session
    } else if (isCreateSession === 1) {
      // join existing session
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl mb-4">WELCOME TO FUN-GAMES</h2>
            <div className='bg-white p8 text-left'>
              <h3 className="text-xl mb-4">Lots of fun games/activities including: </h3>
              <ul className='list-disc'>
                <li>Tic Tac Toe (Tournament style or 1v1!)</li>
                <li>Funny Goofy Cards</li>
                <li>Definitely NOT a Piccolo ripoff...</li>
                <li>2 Truths and a lie</li>
              </ul>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg"
              onClick={() => setIsCreateSession(0)}
            >
              Create Session
            </button>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsCreateSession(1)}
            >
              Join Session
            </button>
            <div>
              {isCreateSession === 0 && (
                <input placeholder='New Session Name'></input>
              )}
              {isCreateSession === 1 && (
                <input placeholder='Enter Session Name'></input>
              )}
              <button className='bg-green-500 text-white px-4 py-2 rounded-lg'
                onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeModal;
