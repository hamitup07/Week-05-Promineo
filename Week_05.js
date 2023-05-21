/* 

Steve Hamilton
Week 05 Assignment
2023-3-30-fe

Assignment parameters: 
-Create a menu app with at least one array and at least two classes
-Include functionality for creating, viewing, and deleting elementds

This project is designed with teachers in mind, and will allow the user to create class lists with students and grades.

*/


// Before working with the Menu and it's methods, I've defined a student class and a class class. It's all very classy.

class Student {
    constructor(firstName, lastName, grade) { // I've added first and last name functionality here, as it is useful for teachers.
            this.firstName = firstName;
            this.lastName = lastName;
            this.grade = grade; //I've also added a grade function so that the user can input grades that are attached to students.
    }
    describe() {
            return `${this.firstName} ${this.lastName} has a/an ${this.grade} in this class.`;
    }
}

class Class { // :) 
    constructor(name) {
        this.name = name;
        this.students = [];
    }

    addStudent(student) {
            if (student instanceof Student) {
                this.students.push(student);
            } else {
                throw new Error(`You can only add an instance of Student. This is not a student: ${student}`);
            }
    }
    describe() {
            return(`${this.name} has ${this.students.length} students.`);
    }
}


//Now for the Menu class. I've used the code from the week 05 instructional videos as a starting point. 

class Menu {
    constructor() {
        this.classes = [];
        this.selectedClass = null;
    }

    start() { //This is the basic central loop of the menu:
        let selection = this.showMainMenu();
        while (selection !=0) {
            switch (selection ) {
                case "1":
					this.createClass();
					break;
				case "2":
					this.viewClass();
					break;
				case "3":
					this.deleteClass();
					break;
				case "4":
					this.displayClasses();
					break;
				default:
					selection = 0;
            }

            selection = this.showMainMenu();
        }
        alert("Goodbye!");
    }

    showMainMenu() { //Here is the visual side of the Main Menu Function. Interestingly, the code would function without this method if the user had all of these options memorized.
        return prompt(`
        Welcome! Please select from the options below:
        
        0) Exit
        1) Create New Class
        2) View Class
        3) Delete Class
        4) View all Classes
        `);
    }
    
    // The method I'm using for creating methods in the Menu object is top-down, just like in the instruction for this week. I've called them in the code above where they are defined down here.
    showClassesMenu(classInfo) {
        return prompt(`
        0) Back
        1) Create Student
        2) Delete Student
        ----------------------
        ${classInfo}
        `);
    }
   
    displayClasses() {
        let classesString = "List of Classes: \n";
        for (let i = 0; i < this.classes.length; i++) {
            classesString += i + ") " + this.classes[i].name + "\n";
        }
        alert(classesString);
    }
    
    createClass() {
        let name = prompt(`Enter name for new class: `);
        this.classes.push(new Class(name));
    }
    
    //One of the things I didn't like about the menu app as it was originally presented was that you had to navigate to "view all classes" to find the index of the class you wanted, then navigate back to "view class" to view it.
    //I've fixed this by copying some code from the displayClasses method into the viewClass method. Now when you slect "View Class" you are presented by a list of all classes so that you can see the index you need.

    viewClass() {
        let classesString = "List of Classes: \n";
        for (let i = 0; i < this.classes.length; i++) {
            classesString += i + ") " + this.classes[i].name + "\n";
        } 
        let index = prompt(`
        ${classesString} 
        Enter the index of the class you wish to view:  `);
        if (index > -1 && index < this.classes.length) {
            this.selectedClass = this.classes[index];
            let description = "class name: " + this.selectedClass.name + "\n";
    
            for (let i = 0; i < this.selectedClass.students.length; i++) {
                description += i + ") " + this.selectedClass.students[i].lastName + ", " + this.selectedClass.students[i].firstName + ". Grade: " + this.selectedClass.students[i].grade + "\n";
                }
                
                let selection = this.showClassesMenu(description); //This section must match the showClassesMenu method exactly, or user confusion will result.
                switch(selection) {
                    case "0":
                        this.showMainMenu();
                        break;
                    case "1":
                        this.createStudent();
                        break;
                    case "2":
                        this.deleteStudent();
                }
            }
        }
        
        //Again, here I've included first and last name functionality:

        createStudent() {
            let firstName = prompt(`Enter the student's first name: `);
            let lastName = prompt(`Enter the student's last name: `)
            let grade = prompt(`Enter a grade for the student: `);
            this.selectedClass.students.push(new Student(firstName, lastName, grade));
        }
        
        deleteStudent() {
            let index = prompt(`Enter the index of the student you wish to delete: `)
            if (index > -1 && index < this.selectedClass.students.length) {
                this.selectedClass.students.splice(index, 1);
            }
        }
        
        deleteClass() {
            let classesString = "List of Classes: \n";
            for (let i = 0; i < this.classes.length; i++) {
            classesString += i + ") " + this.classes[i].name + "\n";
            } 

            let index = prompt(`
            ${classesString}
            Enter the index of the class you wish to delete: `)
            if (index > -1 && index < this.classes.length) {
                this.classes.splice(index, 1);
            }
        }
}

//The above is great, but it's all meaningless without a command to start the menu:

let menu = new Menu();
menu.start();



