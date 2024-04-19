export function DailyWeatherCard({icon, temperature, date}) {
    const iconLink = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <div className="grid justify-around items-center grid-cols-3">
            <img src={iconLink} alt="Weather Icon" className="-m-3"/>
            <span className="text-2xl">{temperature}°C</span>
            <span className="text-2xl">{date}</span>
        </div>
    )
}