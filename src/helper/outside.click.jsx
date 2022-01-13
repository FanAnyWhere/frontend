// import { useEffect } from 'react';

// export const useClickOutside = (
//     insideRefs,
//     isVisible,
//     onClose,
//   ) => {
//     useEffect(() => {
//       const handleWindowClick = (event) => {
//         const someRefContainTarget = insideRefs
//           .filter((ref) => ref.current)
//           .some((ref) => ref.current.contains(event.target));
  
//         if (someRefContainTarget) {
//           return;
//         }
  
//         if (!isVisible) {
//           return;
//         }
  
//         if (onClose) {
//           onClose();
//         }
//       };
  
//       if (isVisible) {
//         window.addEventListener('click', handleWindowClick);
//       }
  
//       return () => {
//         if (isVisible) {
//           window.removeEventListener('click', handleWindowClick);
//         }
//       };
//     }, [isVisible, onClose]);
//   };



import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;