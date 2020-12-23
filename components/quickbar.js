import TickerIcon from "./ticker-icon";


export default function SidebarTickers() {
    return (
        <div className="absolute top-0 left-0 h-full">
            <div className="sticky top-10">
                <TickerIcon icon="/icon-starlink.svg" name="Starlink" link="/starlink"/>
                <TickerIcon icon="/icon-tesla.svg" name="Tesla" link="/tesla"/>
            </div>
        </div>
    );
}
