import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


export const SideBlock = ({ title, children, rightIcon }) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <div style={{
          padding: '15px 15px 0 15px',
          display: 'flex',
          gap: '20px'
      }}>
          <Typography variant="h6" classes={{ root: styles.title }}>
              {title}
          </Typography>
          {rightIcon}
      </div>
      {children}
    </Paper>
  );
};
