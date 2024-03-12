import React, {useEffect, useState} from "react";
import './index.css';
import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
    usePlatform,
    Input,
    Button,
    Spinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {createRoot} from "react-dom/client";
import {requestGetIdeas, requestGroup} from "./requestAPI";
import {FilterPanel} from "./components/FilterPanel";
import {CardGroup} from "./components/CardGroup";

const Example = () => {
    const platform = usePlatform();

    const [loading, setLoading] = useState(false) //Флаг загрузки(спинера)
    const [data, setData] = useState([]) // данные
    // const [openFriends, setopenFriends] = useState(false) // флаг открытия боковой панели
    // const [changeId, seChangeId] = useState(-1) // id выбранной группы

    //пер для сортировки и фильтрации
    const [filterClosed, setFilterClosed] = useState(undefined) // тип открытости
    const [haveColor, setHaveColor] = useState([]) // Список существующих цветов
    const [changeColor, setChangeColor] = useState([]) // Список выбранных цветов
    const [baseSlipValue, setBaseSlipValue] = useState([0,0]) // Мин и макс кол-во подписчиков в данных
    const [changeSlipValue, setChangeSlipValue] = useState([0,0]) // выбранное Макс и мин кол-во подписчиков
    const [onlyFriends, setOnlyFriends] = useState(false) // выбранное Макс и мин кол-во подписчиков

    const [sortType, setSortType] = useState(false) // выбранное Макс и мин кол-во подписчиков
    const [getURL, setGetURL] = useState("") // выбранное Макс и мин кол-во подписчиков


    useEffect(()=>{
        requestGroup(setLoading, setData)
    }, [])

    /**
     * Поиск всех цветов
     */
    useEffect(() =>{
        let newListColor = haveColor
        let newColorVal = []
        let minMembers = 1e9
        let maxMembers = 0
        for (let i = 0; i < data.length; i++){
            if (!newListColor.includes(data[i].avatar_color) && data[i].avatar_color !== undefined)// смотрим все сущ-ие цвета без повторений
                newListColor.push(data[i].avatar_color)

            if (data[i].members_count > maxMembers)// ищем мин кол-во подписчиков
                maxMembers = data[i].members_count

            if (data[i].members_count < minMembers)// ищем макс кол-во подписчиков
                minMembers = data[i].members_count

        }
        for (let i = 0; i < newListColor.length; i++){ //заносим сущ цвета
            newColorVal.push({value:newListColor[i], label:newListColor[i]})
        }
        setHaveColor(newColorVal) // сущ цвета

        setBaseSlipValue([minMembers, maxMembers])
        setChangeSlipValue([minMembers, maxMembers])
    }, [data])

    // /**
    //  * Открытие панели друзей при выборе группы
    //  * @param changeId выбр. id группы
    //  */
    // const funCheckFriend = (changeId) => {
    //     setopenFriends(true)
    //     seChangeId(changeId)
    // }
    // /**
    //  * Закрытие панели друзей
    //  */
    // const funCloseFriendPanel = () => {
    //     setopenFriends(false)
    //     seChangeId(-1)
    // }

    /**
     * Функция для фильтрации
     * @param item Элемент
     * @returns {false|boolean|*|boolean} Подпадает ли под выбранный фильтр
     */
    function filterItems(item){
        let flag = false
        if (changeColor.length !== 0)
        {
            for (let i = 0; i < changeColor.length; i++)
                if (changeColor[i].value ===  item.avatar_color)
                {
                    flag = true
                    break
                }
        }
        else
            flag = true

        return  (filterClosed === undefined || item.closed === filterClosed) && flag
            && ((item.members_count >= changeSlipValue[0] && item.members_count <= changeSlipValue[1]) || item.members_count === undefined)
            && (onlyFriends? item.friends && item.friends.length > 0: true)
    }

    return (
        <AppRoot>
            <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
                <SplitCol autoSpaced>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader className="MainHeader">Список групп</PanelHeader>

                            <FilterPanel
                                changeColor={changeColor}
                                haveColor={haveColor}
                                setChangeColor={setChangeColor}
                                baseSlipValue={baseSlipValue}
                                changeSlipValue={changeSlipValue}
                                setFilterClosed={setFilterClosed}
                                setChangeSlipValue={setChangeSlipValue}
                                setOnlyFriends={setOnlyFriends}
                                setSortType={setSortType}/>

                            {loading && <Spinner size="large" style={{margin: '20px 0'}}/>}

                            <CardGroup data={data} filterid={filterItems}  sortType={sortType}/>
                            <Input
                                id="exampleClickable"
                                value={getURL}
                                onChange={e => setGetURL(e.target.value)}
                                type="text"
                                placeholder="Введите URl для get запроса"
                            />
                            <Button
                                loading={loading}
                                mode="secondary"
                                onClick={() => {requestGetIdeas(setData, setLoading, getURL)}}
                            >
                                Запрос
                            </Button>
                        </Panel>
                    </View>
                </SplitCol>


                {/*{openFriends && <FriendsPanel data={data} changeId={changeId} funCloseFriendPanel={funCloseFriendPanel} openFriends={openFriends}/>}*/}

            </SplitLayout>
        </AppRoot>
    );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <Example />
        </AdaptivityProvider>
    </ConfigProvider>,
);
