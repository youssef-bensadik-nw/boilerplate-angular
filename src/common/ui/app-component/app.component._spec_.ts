import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

const trKeys = {
	actions: { delete: "Delete" }
};

describe("AppComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
			]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it("should display the delete button with correct text", () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector("button");
		const spanElement: HTMLSpanElement | null = buttonElement.querySelector(".mdc-button__label");

		expect(buttonElement).toBeTruthy();
		expect(spanElement).toBeTruthy();

		expect(spanElement?.textContent?.trim()).toBe(trKeys.actions.delete);
	});

});
