import * as React from "react";

import BottomNavigation, {BottomNavigationAction} from "material-ui/BottomNavigation";
import Tooltip from "material-ui/Tooltip";

import { Link } from "react-router-dom";

import FavoriteIcon from "material-ui-icons/Favorite";
import GithubIcon from "./icons/GithubIcon";

export default class BottomBar extends React.Component<{}, {}> {
    render() {
        return <div className="BottomBar">
            <BottomNavigation>
                <Tooltip placement="top" title="The Github Repository">
                    <Link target="_blank" to="https://github.com/Polynomdivision/KanjiSRS">
                        <BottomNavigationAction
                            label="GitHub"
                            icon={
                                <GithubIcon />
                            }
                        />
                    </Link>
                </Tooltip>
                <Tooltip placement="top" title="Made with &#9829; by Polynomdivision">
                    <Link target="_blank" to="https://github.com/Polynomdivision/">
                        <BottomNavigationAction
                            label="Polynomdivision"
                            icon={
                                <FavoriteIcon />
                            }
                        />
                    </Link>
                </Tooltip>
            </BottomNavigation>
        </div>;
    }
};
