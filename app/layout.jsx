import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "PromptsForYou",
  description: "Get cutomized AI prompts ",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ToastContainer />
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
