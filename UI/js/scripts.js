
const validate = () => {
  let msg = '';
  const fnames = document.querySelector('#fullname').value;
  const uname = document.querySelector('#username').value;
  const email = document.querySelector('#usermail').value;
  const pswd = document.querySelector('#userpswd').value;
  const repswd = document.querySelector('#confpswd').value;
  // let exp =" /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
  // var patt = new RegExp(exp);
  if (fnames === '' || uname === '' || email === '' || pswd === '' || repswd === '') {
    msg = 'Please fill out all required fields';

    dialogbox(msg);
  }
};
const check = () => {
  let msg = '';
  const email = document.querySelector('#ermail').value;
  const pswd = document.querySelector('#pswd').value;
  // let exp =" /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
  // var patt = new RegExp(exp);
  if (email === '' || pswd === '') {
    msg = 'Please fill out all required fields';

    dialogbox(msg);
  }
  else
  {
    viewarticlee();
  }
};

let dialogbox = (message) => { // Get the modal
  const modal = document.querySelector('#dialogbox');

  const divMsg = document.querySelector('.dialog-content-js');


  divMsg.textContent = message;
  // Display the modal
  modal.style.display = 'block';
};
// Function close the dialog box
const closeDialog = () => {
  document.querySelector('.modal').style.display = 'none';
  const modal = document.querySelector('#dialogbox');
  modal.style.display = 'none';
};

// Side Navigation
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
  document.getElementById('mySidenav').style.display = 'block';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};

// Create a articlee
const createarticlee = () => {
  // document.querySelector('.modal').style.display="block";
  document.querySelector('.modal').style.display = 'block';
};
// close Create articlee Modal
const closecreatearticlee = () => {
  // document.querySelector('.modal').style.display="block";
  document.querySelector('.modal-new-articlee').style.display = 'none';
};
// edit a articlee
const editarticlee = () => {
  document.querySelector('.modal-edit').style.display = 'block';
};
const savearticlee = () => {

};
// close editing modal
const closeModalEdit = () => {
  document.querySelector('.modal-edit').style.display = 'none';
};
// view a articlee
const viewarticlee = () => {
  document.querySelector('.modal-view').style.display = 'block';
};


const closeModalView = () => {
  document.querySelector('.modal-view').style.display = 'none';
};
const bookarticlee = () => {

  location.replace('../html/book_specific_articlee.html');


};
// View Booking
const viewBooking = () => {
  document.querySelector('.modal-view').style.display = 'block';
};

// Cancel articlee
const cancelarticlee = () => {

};
// view a user
const viewUser = () => {
  document.querySelector('.modal-view').style.display = 'block';
};
const createBooking = () => {
  document.querySelector('.modal-edit').style.display = 'block';
};
const cancelBooking = () => {
  document.querySelector('.modal').style.display = 'block';
};





