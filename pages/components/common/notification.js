import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

export default function NotificationDrawer() {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)}>right</Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div>helo</div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}