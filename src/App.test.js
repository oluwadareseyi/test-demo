import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
// import { render } from "@testing-library/react";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * factory function to create shallow wrapper for the app component
 * @function setup
 * @param {object=} props - Component props specific to setup
 * @param {object=} state - Component state specific to setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  state && wrapper.setState(state);
  return wrapper;
};

/**
 * @function checkElement
 * @param {string} val - Data attribute which we want to check exits
 * @returns {null} runs the jest expect function insteaf
 */

const checkElement = (val) => {
  const wrapper = setup();
  const Component = wrapper.find(`[data-test="${val}"]`);
  expect(Component.length).toBe(1);
};

test("renders without errors", () => {
  checkElement("component-app");
});

test("renders increment button", () => {
  checkElement("increment-button");
});

test("renders counter display", () => {
  checkElement("counter-display");
});

test("counter starts at zero", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter", () => {
  // initialize state in setup to call setState
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find the button and similate a click event
  const button = wrapper.find("[data-test='increment-button']");
  button.simulate("click");

  // find counter display and test
  const counterDisplay = wrapper.find("[data-test='counter-display']");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("count not below zero", () => {
  // initialize state in setup to cll seState
  const counter = 0;
  const wrapper = setup(null, { counter });

  // get the decrement button and simulate a click
  const button = wrapper.find("[data-test='decrement-button']");
  button.simulate("click");

  // test if the display contains a value that doesn't go below 0
  const counterDisplay = wrapper.find("[data-test='counter-display']");
  const errorDisplay = wrapper.find("[data-test='counter-error']");
  expect(counterDisplay.text()).toContain(0);
  expect(errorDisplay.length).toBe(1);
});
