import * as React from "react";

import BottomNavigation, {BottomNavigationAction} from "material-ui/BottomNavigation";

import FavoriteIcon from "material-ui-icons/Favorite";

export default class BottomBar extends React.Component<{}, {}> {
    render() {
        return <div>
            <BottomNavigation>
                <a href="https://github.com/Polynomdivision/KanjiSRS">
                    <BottomNavigationAction label="GitHub" icon={<FavoriteIcon />} />
                </a>
            </BottomNavigation>
        </div>;
    }
};
