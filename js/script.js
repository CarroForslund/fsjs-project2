/* When the page loads,
** your program should hide all but the first 10 students in the list.
*/
const pageDiv = document.getElementsByClassName('page')[0]; //div with class "page"
const pageHeader = document.getElementsByClassName('page-header')[0];
const studentsArray = document.querySelectorAll('.student-item'); //Array of students (li)
const students = []; //sorted student array
let searchResult = [];
let paginationDiv = null; //class pagination

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

function searchBox(){
  const div = document.createElement('div');
  div.className = 'student-search';
  pageHeader.appendChild(div);

  const input = document.createElement('input');
  input.placeholder = 'Search for students...';
  input.addEventListener('keypress', function (e) {
    const input = document.querySelector('input');
    const value = input.value;
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      console.log('enter search');
      input.value = '';
      searchStudents(value);
    };
  });
  div.appendChild(input);

  const button = document.createElement('button');
  button.innerHTML = 'Search';
  button.addEventListener('click', function(){
    console.log('button search');
    const input = document.querySelector('input');
    const value = input.value;
    input.value = '';
    searchStudents(value);
  });
  div.appendChild(button);

};

function searchStudents(input){
  console.log(input);

  for (let i = 0; i < students.length; i++){
    if (students[i].name.includes(input) || students[i].email.includes(input)){
      searchResult.push(students[i]);
    };
  };
  console.log(searchResult);
  paginationDiv.parentNode.removeChild(paginationDiv);
  showStudents(1, searchResult);
  searchResult = [];


};

function showStudents(pageNumber, arrayOfStudents){
  const studentList = document.querySelector('.student-list');
  studentList.parentNode.removeChild(studentList); //Hide HTML list from index

  //Display students
  const ul = document.createElement('ul');
  ul.className = 'student-list';
  pageDiv.appendChild(ul);

  startIndex = pageNumber*10-10;
  if (pageNumber*10 > arrayOfStudents.length){
    endIndex = arrayOfStudents.length;
  } else {
    endIndex = pageNumber*10;
  };

  for (let i = pageNumber*10-10; i < pageNumber*10 && i < arrayOfStudents.length; i++){

    const li = document.createElement('li');
    li.className = 'student-item cf';
    ul.appendChild(li);

    const studentDiv = document.createElement('div');
    studentDiv.className = 'student-details';
    li.appendChild(studentDiv);

    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = arrayOfStudents[i].avatar;
    studentDiv.appendChild(img);

    const nameH3 = document.createElement('h3');
    nameH3.innerHTML = arrayOfStudents[i].name;
    studentDiv.appendChild(nameH3);

    const emailSpan = document.createElement('span');
    emailSpan.className = 'email';
    emailSpan.innerHTML = arrayOfStudents[i].email;
    studentDiv.appendChild(emailSpan);

    const joinedDiv = document.createElement('div');
    joinedDiv.className = 'joined-details';
    li.appendChild(joinedDiv);

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.innerHTML = arrayOfStudents[i].joined;
    joinedDiv.appendChild(dateSpan);

  };
  pagination(pageNumber, arrayOfStudents);

};

function calculateNumberOfPages(arrayOfStudents){
  const numberOfPages = Math.ceil(arrayOfStudents.length/10); //Rounds up to closest int
  return numberOfPages;
};

//Pagination
function pagination(pageNumber, arrayOfStudents) {

  numberOfPages = calculateNumberOfPages(arrayOfStudents);

  paginationDiv = document.createElement('div'); //class pagination
  paginationDiv.className = 'pagination';
  const ul = document.createElement('ul');

  for (let i = 1; i < numberOfPages+1; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.text = i;
    if (i === pageNumber){
      a.className = 'active';
    }
    a.addEventListener('click', function(){
      paginationDiv.parentNode.removeChild(paginationDiv); //reset pagination div
      showStudents(i, arrayOfStudents);
    });
    li.appendChild(a);
    ul.appendChild(li);
  };


  paginationDiv.appendChild(ul);
  pageDiv.appendChild(paginationDiv);

};

searchBox();
sortStudentList();
//showStudents(1);
showStudents(1, students);

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
