/* When the page loads,
** your program should hide all but the first 10 students in the list.
*/
const pageDiv = document.getElementsByClassName('page')[0]; //div with class "page"
const studentsArray = document.querySelectorAll('.student-item'); //Array of students (li)
const studentList = document.querySelector('.student-list'); //(ul)
const students = []; //sorted student array

sortStudentList();
printStudentList();
pagination();

studentList.parentNode.removeChild(studentList); //Hide student list

//Show 10 students per "page"

/* CREATE ANY ELEMENT
*/
//const createElement = (elementName, property, value) =>{
// const createElement = (elementName) =>{
//   const element = document.createElement(elementName);
//   //element[property] = value;
//   return element;
// };

//Append element
// function appendElement(parent, element){
//   parent.appendChild(element);
// };

//Pagination
function pagination() {
  const numberOfPages = Math.ceil(studentsArray.length/10); //Rounds up to closest int
  const paginationDiv = document.createElement('div'); //class pagination
  paginationDiv.className = 'pagination';
  //const ul = document.createElement('ul');
  const ul = document.createElement('ul');

  for (let i = 1; i < numberOfPages+1; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.text = i;
    li.appendChild(a);
    ul.appendChild(li);
  };

  paginationDiv.appendChild(ul);
  pageDiv.appendChild(paginationDiv); //Now in body. Have to move into page-div
};

//clean up studentList and save to students
function sortStudentList () {
  for (let i = 0; i < studentsArray.length; i++){
    const studentName = studentsArray[i].querySelector('h3').innerHTML;
    const studentEmail = studentsArray[i].querySelector('span').innerHTML;
    const studentAvatar = studentsArray[i].querySelector('img').src;
    const studentJoined = studentsArray[i].querySelector('div:nth-child(2)').querySelector('span').innerHTML;

    const student = {
      name: studentName,
      email: studentEmail,
      avatar: studentAvatar,
      joined: studentJoined
    };
    students.push(student);
  };
};

function printStudentList(){
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'student-list');
  pageDiv.appendChild(ul);

  //for (let i = 0; i < students.length; i++){
  for (let i = 0; i < 10; i++){

    const li = document.createElement('li');
    li.setAttribute('class', 'student-item cf');
    ul.appendChild(li);

    const studentDiv = document.createElement('div');
    studentDiv.setAttribute('class', 'student-details')
    li.appendChild(studentDiv);

    const img = document.createElement('img');
    img.setAttribute('class', 'avatar')
    img.setAttribute('src', students[i].avatar)
    studentDiv.appendChild(img);

    const nameH3 = document.createElement('h3');
    nameH3.innerHTML = students[i].name;
    studentDiv.appendChild(nameH3);

    const emailSpan = document.createElement('span');
    emailSpan.setAttribute('class', 'email');
    emailSpan.innerHTML = students[i].email;
    studentDiv.appendChild(emailSpan);

    const joinedDiv = document.createElement('div');
    joinedDiv.setAttribute('class', 'joined-details');
    li.appendChild(joinedDiv);

    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'date');
    dateSpan.innerHTML = students[i].joined;
    joinedDiv.appendChild(dateSpan);
  };
};

// <ul class="student-list">
//   <li class="student-item cf">
//       <div class="student-details">
//           <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">
//           <h3>iboya vat</h3>
//           <span class="email">iboya.vat@example.com</span>
//       </div>
//       <div class="joined-details">
//              <span class="date">Joined 07/15/15</span>
//      </div>
//   </li>

/* When a user clicks on “2” in the pagination, students 11 through 20 are shown.
** When a user clicks “3”, students 21 through 30 are shown. And so on. When “6”
** is clicked 51 through 55 should be shown.
*/

// };
// a.addEventListener('click', (e) => {
//   //show students with number from i*10-9 to i*10 (or less if last page)
//   console.log('hello event');
//   for (let i = 0; i < students.length; i++){
//     console.log(student[i]);
//   };
// });

/* Your program should work for any number of students.
** There are 54 students in index.html, but you can test your code by adding
** the JavaScript file your write to the other lists of students we’ve provided
** in the student-list-examples folder.
*/
