import {NavLink, NavLinkProps, useMatch} from "react-router-dom";

type NavigationButtonProps = {
    className?: string; icon: string; label: string; navigation_link_props: NavLinkProps;
}

export default function NavigationButton(props: NavigationButtonProps) {


    const {label, icon, navigation_link_props} = props;
    const active = useMatch(String(navigation_link_props.to))

    return (
        <NavLink {...navigation_link_props} className={`${props.className} flex flex-col place-items-center ${active ? "text-white" : "text-zinc-600"}`}>
            <span className="material-symbols-outlined">
                {icon}
            </span>
            <p className="leading-tight text-sm">
                {label}
            </p>
        </NavLink>
    )
}