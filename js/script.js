const pageDiv = document.getElementsByClassName('page')[0]; //div with class "page"
const pageHeader = document.getElementsByClassName('page-header')[0];
let studentList = document.querySelector('.student-list'); //Ul with students
const studentsArray = document.querySelectorAll('.student-item'); //Array of students (li)
const students = []; //organized student array
let paginationDiv = null;
let paginationDivShows = true;

/* NEW CLEAN ARRAY OF STUDENTS
** Clean up studentsArray and save to new array called studentsArray
** (Maybe unnessecary, but the best solution I could come up with for now)
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
      input.value = '';
      searchStudents(value);
    };
  });
  div.appendChild(input);

  const button = document.createElement('button');
  button.innerHTML = 'Search';
  button.addEventListener('click', function(){
    const input = document.querySelector('input');
    const value = input.value;
    input.value = '';
    searchStudents(value);
  });
  div.appendChild(button);

};

/* SEARCH FUNCTION
** Use input from the search box to find matching student names or student emails
** Show result if there is at least one match, or return message if there isn't
*/
function searchStudents(input){
  if (paginationDivShows){
    removePagination();
  };

  //Will store matching students if there is any
  let searchResult = [];

  //Loop through students to see if there is a name or email including the search input
  for (let i = 0; i < students.length; i++){
    if (students[i].name.includes(input) || students[i].email.includes(input)){
      searchResult.push(students[i]);
    };
  };

  //If there is a match return result
  //Otherwise show a message no match was found
  if (searchResult.length >= 1){

    showStudents(1, searchResult);
    searchResult = [];

  } else {

    studentList = document.querySelector('.student-list');
    pageDiv.appendChild(studentList);
    studentList.parentNode.removeChild(studentList); //Hide HTML list from index

    paginationDiv = createElement('div', 'className', 'pagination');
    pageDiv.appendChild(paginationDiv);
    paginationDiv.parentNode.removeChild(paginationDiv); //reset pagination div
    studentList = createElement('div', 'className', 'student-list');
    pageDiv.appendChild(studentList);
    const p = document.createElement('p');
    p.innerHTML = "Unfortunately we couldn't find any students matching your search."
    studentList.appendChild(p);
  };
};

/* SHOW STUDENTS ON PAGE
** Use chosen array of students
** Print student list, maximum 10 students per page
*/
function showStudents(pageNumber, arrayOfStudents){

  pageDiv.removeChild(studentList); //Hide HTML list from index

  studentList = createElement('ul', 'className', 'student-list');
  pageDiv.appendChild(studentList);

  //Calculate the range of students to display
  startIndex = pageNumber*10-10;
  if (pageNumber*10 > arrayOfStudents.length){
    endIndex = arrayOfStudents.length;
  } else {
    endIndex = pageNumber*10;
  };

  //Print the calculated range of students to page
  for (let i = pageNumber*10-10; i < pageNumber*10 && i < arrayOfStudents.length; i++){

    const li = document.createElement('li');
    li.className = 'student-item cf';
    studentList.appendChild(li);

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

    const emailSpan = createElement('span', 'className', 'email');
    emailSpan.innerHTML = arrayOfStudents[i].email;
    studentDiv.appendChild(emailSpan);

    const joinedDiv = createElement('div', 'className', 'joined-details');
    li.appendChild(joinedDiv);

    const dateSpan = createElement('span', 'className', 'date');
    dateSpan.innerHTML = arrayOfStudents[i].joined;
    joinedDiv.appendChild(dateSpan);

  };

  //Add pagination to page if there are more than 10 students in the list
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
  paginationDiv = createElement('div', 'className', 'pagination');

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

  paginationDivShows = true;

};

function removePagination(){
  paginationDiv.parentNode.removeChild(paginationDiv); //reset pagination div
  paginationDivShows = false;
};

function clearPage(){
  studentList.parentNode.removeChild(studentList); //Hide HTML list from index

};

/* RUN PROGRAM FROM THIS FUNCTION
** Create a search box
** Organise students
** Show students
*/
function run(){
  searchBox();
  organizeStudentList();
  showStudents(1, students); //default page number and array of student to show
};

run();


/* CREATE ANY ELEMENT WITH A PROPERTY
*/
function createElement(elementName, property, value){
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};
