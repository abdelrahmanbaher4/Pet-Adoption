import { createContext } from "react";

// same as
//const [theme,setTheme]=useState('darkblue')
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
