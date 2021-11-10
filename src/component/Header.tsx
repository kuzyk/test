import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AVAILABLE_LANGS, trans } from "lib/trans";
import React from 'react';

type Props = {
    onLangChange: (lang: string) => void
}

export const Header = ({ onLangChange }: Props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {trans.getString('header.title')}
                </Typography>

                <ButtonGroup color="inherit" variant="text">
                    {AVAILABLE_LANGS.map((lang) => (
                        <Button key={lang} onClick={() => onLangChange(lang)}>{lang}</Button>
                    ))}
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
}
