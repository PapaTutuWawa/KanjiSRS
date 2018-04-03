import * as React from "react";

import BottomNavigation, {BottomNavigationAction} from "material-ui/BottomNavigation";
import Tooltip from "material-ui/Tooltip";

import FavoriteIcon from "material-ui-icons/Favorite";

export default class BottomBar extends React.Component<{}, {}> {
    render() {
        return <div>
            <BottomNavigation>
                <a href="https://github.com/Polynomdivision/KanjiSRS">
                    <Tooltip placement="top" title="The Github Repository">
                        <BottomNavigationAction
                            label="GitHub"
                            icon={
                                <img src="assets/github.png" />
                            }
                        />
                    </Tooltip>
                </a>
                <a href="https://github.com/Polynomdivision/">
                    <Tooltip placement="top" title="Made with &#9829; by Polynomdivision">
                        <BottomNavigationAction
                            label="Polynomdivision"
                            icon={
                                <FavoriteIcon />
                            }
                        />
                    </Tooltip>
                </a>
            </BottomNavigation>
        </div>;
    }
};
