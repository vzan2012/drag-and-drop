namespace App {
    // AutoBind Decorator 
    export function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                return originalMethod.bind(this)
            }
        }
        return adjDescriptor
    }
}