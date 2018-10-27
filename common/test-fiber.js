/**
 * Fiber is what facebook is using for react update,
 * it's designed for asynchronous commits of state changes
 * in react components.
 *
 * Main concept of component update:
 * state changes -> virtual nodes change -> DOM nodes change
 */
class Fiber {
	constructor() {
		this.stack = [];
	}

	/**
	 * add components for update to fiber stack
	 * @param components in form of [{id:1, name:"component_name"}]
	 */
	addToStack(components) {
		this.stack.push(...components);
		this.busy = false;
	}

	* _commit() {
		this.stack.reverse();
		while (this.stack.length !== 0) {
			yield console.log(this.stack.pop());
		}
	}

	commit() {
		let g = this._commit();
		let commitInterval = setInterval(() => {
			if (!this.busy) {
				g.next();
			}
			if (this.stack.length === 0) {
				clearInterval(commitInterval);
			}
		}, 1000);
	}

	stop() {
		this.stack = [];
	}
}

const fiber = new Fiber();
// 3 different components are here for update
let components = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];
fiber.addToStack(components);
fiber.commit();

setTimeout(() => {
	fiber.busy = true;
}, 1500);
setTimeout(() => {
	fiber.busy = false;
}, 5000);