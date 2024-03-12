import '../index.css';
import {Group, Header, SimpleCell, Accordion} from "@vkontakte/vkui";
import {TypeOfSort} from "../func";
import {Icon24AddOutline, Icon24MinusOutline} from "@vkontakte/icons";

/**
 * Поля вывода карточек
 * @param data
 * @param filterid
 * @param funCheckFriend
 * @returns {JSX.Element}
 * @constructor
 */
export function CardGroup({data, filterid, sortType}){
    return (
        <div className="GroupDiv">
            {data.filter(filterid).sort(TypeOfSort(sortType)).map((item, index)=>
            {
                return (
                    <Group key={item.id} className="GroupCard"  header={<Header size="large" mode="primary">{item.name}</Header>} mode="card">

                        <div className="iconCard" style={{backgroundColor:item.avatar_color?item.avatar_color:"darkgrey"}}/>

                        {item.closed !== undefined && <SimpleCell>{item.closed ? "Открытая" : "Закрытая"} группа</SimpleCell>}

                        {!isNaN(item.members_count) &&
                            <SimpleCell>{item.members_count} подписчи{item.members_count === 0 ? "ков" : item.members_count === 1 ? "к" : item.members_count < 5 ? "ка" : "ков"}</SimpleCell>}

                        {/*{item.friends && <SimpleCell*/}
                        {/*    onClick={(e) => funCheckFriend(index)}>В подписчиках {item.friends ? item.friends.length : 0} дру{item.friends ? item.friends.length === 1 ? "г" : item.friends.length < 5 ? "га" : "зей" : "зей"}</SimpleCell>}*/}

                        {item.friends && <Accordion >
                            <Accordion.Summary ExpandIcon={Icon24AddOutline} CollapseIcon={Icon24MinusOutline}>В подписчиках {item.friends ? item.friends.length : 0} дру{item.friends ? item.friends.length === 1 ? "г" : item.friends.length < 5 ? "га" : "зей" : "зей"}</Accordion.Summary>
                            <div style={{maxHeight:"150px", overflowY:"auto"}}>
                            <Accordion.Content>
                                {item.friends.map((itemFr, index) => {
                                    return <SimpleCell key={index}>— {itemFr.last_name} {itemFr.first_name}</SimpleCell>
                                })}
                            </Accordion.Content>
                            </div>
                        </Accordion>}
                    </Group>)
            })}
        </div>
    )
}