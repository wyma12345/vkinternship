import '../index.css';
import {Header, IconButton, SimpleCell} from "@vkontakte/vkui";
import {Icon24CancelOutline} from "@vkontakte/icons";


export function FriendsPanel({data, changeId,funCloseFriendPanel}){
    return (
        <div  className="friendsPanel">
            <div className="friendList">
                <IconButton title="Удалить 36" style={{float: "right"}} onClick={funCloseFriendPanel}><Icon24CancelOutline/></IconButton>
                <br/>
                <br/>
                <Header size="large" mode="primary">Список друзей</Header>
                {data[changeId].friends.map((item, index)=> {
                    return <SimpleCell after={<br/>}>— {item.last_name} {item.first_name}</SimpleCell>
                })}

            </div>
        </div>
    )
}
