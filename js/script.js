const pageDiv = document.getElementsByClassName('page')[0]; //div with class "page"
const pageHeader = document.getElementsByClassName('page-header')[0];
let studentList = document.querySelector('.student-list'); //Ul with students
const studentsArray = document.querySelectorAll('.student-item'); //Array of students (li)
const students = []; //organized student array
let paginationDiv = null;
let paginationDivShows = true;

/* NEW CLEAN ARRAY OF STUDENTS
** Clean up studentsArray and save to new array called studentsArray
*/
function organizeStudentList () {

  for (let i = 0; i < studentsArray.length; i++){
    //Get every student's information
    const studentName = studentsArray[i].querySelector('h3').innerHTML;
    const studentEmail = studentsArray[i].querySelector('span').innerHTML;
    const studentAvatar = studentsArray[i].querySelector('img').src;
    const studentJoined = studentsArray[i].querySelector('div:nth-child(2)').querySelector('span').innerHTML;

    //Create a student object
    const student = {
      name: studentName,
      email: studentEmail,
      avatar: studentAvatar,
      joined: studentJoined
    };
    //Add student to the new array students
    students.push(student);
  };
};

/* ADD SEARCHBOX TO PAGE
** Search for matching student names or student emails
** Listens to enter key press and button click
*/
function searchBox(){
  //Display a search div
  const div = createElementAppend('div', 'className', 'student-search', pageHeader);
  const input = createElementAppend('input', 'placeholder', 'Search for students...', div);
  const button = createElementAppend('button', 'innerHTML', 'Search', div);

  //Add functionality to search field
  input.addEventListener('keypress', function (e) {
    const input = document.querySelector('input');
    const value = input.value;
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      input.value = '';
      searchStudents(value);
    };
  });

  //Add functionality to search button
  button.addEventListener('click', function(){
    const input = document.querySelector('input');
    const value = input.value;
    input.value = '';
    searchStudents(value);
  });
};

/* SEARCH FOR STUDENTS
** Use input from the search box to find matching student names or student emails
** Show result if there is at least one match, or return message if there isn't
*/
function searchStudents(input){
  if (paginationDivShows){
    removePagination();
  };

  //Will store matching students if there's any
  let searchResult = [];

  //Search through students
  //If the search input matches the name or email of a student, add student to search result
  for (let i = 0; i < students.length; i++){
    if (students[i].name.includes(input) || students[i].email.includes(input)){
      searchResult.push(students[i]);
    };
  };

  //If there is a match display matched students, or show message that no match was found
  if (searchResult.length >= 1){
    showStudents(1, searchResult);
    searchResult = [];

  } else {
    pageDiv.removeChild(studentList); //Clear student list

    //Display message that no student matched the search result
    paginationDiv = createElementAppend('div', 'className', 'pagination', pageDiv);
    paginationDiv.parentNode.removeChild(paginationDiv); //reset pagination div
    studentList = createElementAppend('div', 'className', 'student-list', pageDiv);
    const p = createElementAppend('p', 'innerHTML', 'No students match your search.', studentList);
  };
};

/* SHOW STUDENTS ON PAGE
** Use chosen array of students
** Display student(s) in unordered list (maximum 10 students per page)
*/
function showStudents(pageNumber, arrayOfStudents){
  pageDiv.removeChild(studentList); //Clear current student list before displaying a new one
  studentList = createElementAppend('ul', 'className', 'student-list', pageDiv);

  //Display each student in the array
  for (let i = pageNumber*10-10; i < pageNumber*10 && i < arrayOfStudents.length; i++){
    const li = createElementAppend('li', 'className', 'student-item cf', studentList);

    //Student's details div
    const studentDiv = createElementAppend('div', 'className', 'student-details', li);

    //Student's avatar
    const img = createElementAppend('img', 'className', 'avatar', studentDiv);
    img.src = arrayOfStudents[i].avatar;

    //Student's name
    const nameH3 = createElementAppend('h3', 'innerHTML', arrayOfStudents[i].name, studentDiv);

    //Student's email
    const emailSpan = createElementAppend('span', 'className', 'email', studentDiv);
    emailSpan.innerHTML = arrayOfStudents[i].email;

    //Student's join details div
    const joinedDiv = createElementAppend('div', 'className', 'joined-details', li);

    //Student's join date
    const dateSpan = createElementAppend('span', 'className', 'date', joinedDiv);
    dateSpan.innerHTML = arrayOfStudents[i].joined;
  };

  //Add pagination if there are more than 10 students in the list
  if (arrayOfStudents.length > 9){
    pagination(pageNumber, arrayOfStudents);
  };
};

/* PRINT PAGINATION LINKS
** Pagination links to display at the bottom of the page
** Makes it possible to navigate through the list of students if more than 10 is listed
*/
function pagination(pageNumber, arrayOfStudents) {
  //Calculate how many pages are needed for the amount of students in array
  const numberOfPages = Math.ceil(arrayOfStudents.length/10); //Rounds up to closest int

  //Set paginationDiv value
  paginationDiv = createElementAppend('div', 'className', 'pagination', pageDiv);

  //Create pagination links (ul), give current page number the class "active"
  const ul = document.createElement('ul');
  paginationDiv.appendChild(ul);

  for (let i = 1; i < numberOfPages+1; i++){
    const li = document.createElement('li');
    ul.appendChild(li);

    const a = createElementAppend('a', 'href', '#', li);
    a.text = i;
    if (i === pageNumber){
      a.className = 'active';
    }
    a.addEventListener('click', function(){
      if (paginationDivShows){
        removePagination();
      };
      showStudents(i, arrayOfStudents);
    });

  };
  paginationDivShows = true;

};

/* REMOVE PAGINATION FROM PAGE
** And set paginationDivShows to false
*/
function removePagination(){
  paginationDiv.parentNode.removeChild(paginationDiv);
  paginationDivShows = false;
};

/* CREATE ANY ELEMENT WITH A PROPERTY
** return element
*/
function createElement(elementName, property, value){
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};

/* CREATE ANY ELEMENT WITH A PROPERTY AND APPEND TO AN OTHER ELEMENT
** return element
*/
function createElementAppend(elementName, property, value, parentNode){
  const element = document.createElement(elementName);
  element[property] = value;
  parentNode.appendChild(element);
  return element;
};

/* RUN PROGRAM FROM THIS FUNCTION
** Show a search box
** Organise students
** Show students on page(s)
*/
function run(){
  searchBox();
  organizeStudentList();
  showStudents(1, students); //default page number and array of student to show
};

run();
