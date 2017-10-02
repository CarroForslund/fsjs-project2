/* When the page loads,
** your program should hide all but the first 10 students in the list.
*/
window.onload = () => {
  pagination();
}

const body = document.body;
const pageDiv = body.firstChild;//document.getElementsByClassName('page')
const students = document.querySelectorAll('.student-item'); //Array of students
const studentList = document.querySelector('.student-list'); //Ul with students

studentList.parentNode.removeChild(studentList); //Hide student list
//Show 10 students per "page"


/* Look at the HTML in the example-meets.html on lines 119-137
** -- this is an example of the markup you'll need to add dynamically to
** the index.html page to create pagination links.
*/

/* Since only 10 students should be shown at a time, your programming needs to
** calculate the number of pages needed and add the appropriate number of links
** to the bottom of the page.
*/

/* When a user clicks on “2” in the pagination, students 11 through 20 are shown.
** When a user clicks “3”, students 21 through 30 are shown. And so on. When “6”
** is clicked 51 through 55 should be shown.
*/

/* Your program should work for any number of students.
** There are 54 students in index.html, but you can test your code by adding
** the JavaScript file your write to the other lists of students we’ve provided
** in the student-list-examples folder.
*/
