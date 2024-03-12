import '../index.css';
import {Checkbox, ChipsSelect, Group, Select, Slider} from "@vkontakte/vkui";
import {Icon20FilterOutline, Icon24Sort} from "@vkontakte/icons";

/**
 * Панель для установки фильтров
 * @param changeColor
 * @param haveColor
 * @param setChangeColor
 * @param baseSlipValue
 * @param changeSlipValue
 * @param setFilterClosed
 * @param setChangeSlipValue
 * @param setOnlyFriends
 * @returns {JSX.Element}
 * @constructor
 */
export function FilterPanel({changeColor, haveColor, setChangeColor, baseSlipValue, changeSlipValue, setFilterClosed, setChangeSlipValue, setOnlyFriends, setSortType}) {

    const funChangeCloseType = (e) => {
        if (e.target.value === "all")
            setFilterClosed(undefined)
        else
            e.target.value === "open"? setFilterClosed(true) : setFilterClosed(false)
    }

    const funChangeSlipValue = (e) => {
        setChangeSlipValue(e)
    }

    const funChangeOnlyFriend = (e) => {
        setOnlyFriends(e.currentTarget.checked)
    }

    const funSetSortType = (e) => {
        setSortType(e.target.value)
    }

    return (
        <Group className="filterGroup" >
            <Select
                style={{width:"15%"}}
                options = {[{label:  'Открытая', value: "open"}, {label:'Закрытая', value: "close"}, {label:  'Все', value: "all"}]}
                id="filter-id"
                placeholder="Тип группы"
                // allowClearButton
                onChange={funChangeCloseType}
                defaultValue={"all"}
                before = <Icon20FilterOutline/>/>

            <ChipsSelect
                style={{width:"15%"}}
                value={changeColor}
                options={haveColor}
                onChange={setChangeColor}
                placeholder="Цвета не выбраны"
                selectedBehavior="hide"
                dropdownAutoWidth={false}
                closeAfterSelect={false}/>

            Подписчики
            <Slider
                style={{width:"15%", marginTop:"10px"}}
                multiple
                withTooltip
                min={baseSlipValue[0]}
                max={ baseSlipValue[1]}
                value={changeSlipValue}
                onChange={funChangeSlipValue}
                step={1}
                defaultValue={[20, 80]}
            />
            <Checkbox onChange={funChangeOnlyFriend}>Только с друзьями</Checkbox>


            <Select
                style={{width:"15%"}}
                options = {[
                    {label:  'По имени А-Я', value: "nameAZ"},
                    {label:  'По имени Я-А', value: "nameZA"},
                    {label:'По открытости - Открытая-Закрытая', value: "openOC"},
                    {label:'По открытости - Закрытая-Открытая', value: "openCO"},
                    {label:  'По подписчиками(возрастание)', value: "memberUp"},
                    {label:  'По подписчиками(Убывание)', value: "memberDo"},
                    {label:  'По друзьям(возрастание)', value: "friendUp"},
                    {label:  'По друзьям(Убывание)', value: "friendDo"}]}
                id="sort-id"
                placeholder="Тип сортировки"
                // allowClearButton
                onChange={funSetSortType}
                defaultValue={"nameAZ"}
                before = <Icon24Sort/>/>

        </Group>
    );
}