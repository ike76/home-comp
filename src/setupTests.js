import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
require("jest-localstorage-mock");
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });
