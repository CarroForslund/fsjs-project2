/* When the page loads,
** your program should hide all but the first 10 students in the list.
*/
window.onload = () => {
  pagination();
}

const body = document.body;
const pageDiv = document.getElementsByClassName('page')[0];
console.log(pageDiv);
const students = document.querySelectorAll('.student-item'); //Array of students
const studentList = document.querySelector('.student-list'); //(ul)

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
const pagination = () => {
  const numberOfPages = Math.ceil(students.length/10); //Rounds up to closest int
  const paginationDiv = document.createElement('div'); //class pagination
  paginationDiv.className = 'pagination';
  //const ul = document.createElement('ul');
  const ul = document.createElement('ul');

  for (let i = 1; i < numberOfPages+1; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = "#";
    a.text = i;
    li.appendChild(a);
    ul.appendChild(li);
  };

  paginationDiv.appendChild(ul);
  pageDiv.appendChild(paginationDiv); //Now in body. Have to move into page-div
};

/* When a user clicks on “2” in the pagination, students 11 through 20 are shown.
** When a user clicks “3”, students 21 through 30 are shown. And so on. When “6”
** is clicked 51 through 55 should be shown.
*/
// a.addEventListener('click', (e) => {
//   //show students with number from i*10-9 to i*10 (or less if last page)
//
// });

/* Your program should work for any number of students.
** There are 54 students in index.html, but you can test your code by adding
** the JavaScript file your write to the other lists of students we’ve provided
** in the student-list-examples folder.
*/
