import Component from './base-component';
import { autobind as Autobind } from '../decorators/autobind'
import * as Validation from '../util/validation'
import { projectState } from '../state/project-state'

// Project Input Class
export class ProjectInput extends Component<HTMLElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super('project-input', 'app', true, 'user-input')
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement
        this.configure()
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() { }

    private gatherUserInput(): [string, string, number] | void {  // Type : Tuple | void
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = (this.peopleInputElement.value);

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!Validation.validate(titleValidatable) || !Validation.validate(descriptionValidatable) || !Validation.validate(peopleValidatable)) {
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
    @Autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput
            // console.log(title, desc, people)
            projectState.addProject(title, desc, people);
            this.clearFields()
        }
        // console.log(this.titleInputElement.value)
        // console.log(this.descriptionInputElement.value)
        // console.log(this.peopleInputElement.value)
    }

}

