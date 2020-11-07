// AutoBind Decorator 
function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this)
        }
    }
    return adjDescriptor
}


// Project Input Class
class ProjectInput {
    templateElement: HTMLTemplateElement // For the id - project-input - section
    hostElement: HTMLDivElement // For the id - app - section
    element: HTMLFormElement

    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement
        this.hostElement = document.getElementById("app")! as HTMLDivElement

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLFormElement

        this.element.id = 'user-input'

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement

        this.configure()
        this.attach()
    }

    private gatherUserInput(): [string, string, number] | void {  // Type : Tuple | void
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = (this.peopleInputElement.value);

        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert(`Invalid Entry. Please try again !!!`)
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    // Clear the fields 
    private clearFields() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    // Event Handler for the form
    @autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput
            console.log(title, desc, people)
            this.clearFields()
        }
        // console.log(this.titleInputElement.value)
        // console.log(this.descriptionInputElement.value)
        // console.log(this.peopleInputElement.value)
    }

    private configure() {
        // this.element.addEventListener('submit', this.submitHandler.bind(this));
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const prjInput = new ProjectInput();