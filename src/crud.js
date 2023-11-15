const {app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const makeupInput = document.getElementById('makeupInput');

// Directory for storing makeup files
const pathName = path.join(__dirname, 'Files');

function getFileName(makeup) {
  return makeup.toLowerCase()+ '.txt';
}

document.getElementById('btnCreate').addEventListener('click', function () {
  const makeup = makeupInput.value.trim();
  if (makeup) {
    const fileName = getFileName(makeup);
    const file = path.join(pathName, fileName);
    fs.writeFile(file, makeup, function (err) {
      if (err) {
        alert('An error occurred creating the makeup: ' + err.message);
        return console.log(err);
      }
      alert(`Make-up "${makeup}" was added...`);
      makeupInput.value = '';
      displaymakeups(); // Call the function to display makeup
    });
  }
});

const updateButton = document.getElementById('btnUpdate');
function getFileName(makeup) {
    return makeup.toLowerCase() + '.txt';
}

document.getElementById('btnCreate').addEventListener('click', function () {
});

updateButton.addEventListener('click', function () {
    const makeup = makeupInput.value.trim();
    if (makeup) {
      const fileName = getFileName(makeup);
      const file = path.join(pathName, fileName);
  
      fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
          alert(`Make-up "${makeup}" does not exist for updating.`);
          return;
        }

        const additionalContent = '\nUpdated content';
      
        fs.appendFile(file, additionalContent, (err) => {
          if (err) {
            alert('An error occurred updating the makeup: ' + err.message);
            console.log(err);
          } else {
            alert(`Make-up "${makeup}" was updated!`);
            makeupInput.value = '';
            displaymakeups();
          }
        });
      });
    }
  });

// Function to display makeups
function displaymakeups() {
  const makeupList = document.getElementById('makeupList');
  makeupList.innerHTML = ''; // Clear the existing list

  // Read all files in the directory
  fs.readdir(pathName, function (err, files) {
    if (err) {
      return console.log(err);
    }

    // Loop through the files and add them to the list
    files.forEach(function (file) {
      const makeup = file.slice(0, -4); // Convert filename back to makeup
      const listItem = document.createElement('li');
      listItem.textContent = makeup;

      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex'; // Make the container a flex container

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deletemakeup(makeup);
      });

      // Append buttons to the container
      buttonContainer.appendChild(deleteButton);

      // Append the button container to the list item
      listItem.appendChild(buttonContainer);

      // Append the list item to the makeup list
      makeupList.appendChild(listItem);
    });
  });
}

function deletemakeup(makeup) {
  const fileName = getFileName(makeup);
  const file = path.join(pathName, fileName);
  fs.unlink(file, function (err) {
    if (err) {
      alert('An error occurred deleting the makeup: ' + err.message);
      return console.log(err);
    }
    alert(`Make-up "${makeup}" was deleted`);
    displaymakeups(); // Refresh the list after deleting
  });
}

  

// Call the displaymakeup s function when the page loads
displaymakeups();
