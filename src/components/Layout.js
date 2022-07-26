import { AppBar, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons'
import { format } from 'date-fns'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const drawerWidth = 250

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

export default function Layout({ children }) {

    const history = useHistory()
    const classes = useStyles()
    const location = useLocation()
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutline color='secondary' />,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root}>

            {/* app bar */}
            <AppBar className={classes.appbar} elevation={1}>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <Typography>
                        Mario
                    </Typography>
                    <Avatar className={classes.avatar} src='/mario-av.png' />
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer className={classes.drawer} variant="permanent" anchor='left' classes={{ paper: classes.drawerPaper }}>
                <div>
                    <Typography variant='h5' className={classes.title}>
                        Ninja Notes
                    </Typography>
                </div>

                {/* list / links */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>


            </Drawer>

            {/* main Body */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>

        </div>
    )
}
