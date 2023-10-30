import {NavLink, NavLinkProps} from "react-router-dom";

type NavigationButtonProps = {
    className?: string; icon: string; label: string;
} & NavLinkProps;

export default function NavigationButton(props: NavigationButtonProps) {

    const {icon, label} = props;

    return (
        <NavLink {...props} className='bg-neutral-200 gap-1 flex flex-row py-2 px-3 place-items-center rounded-md [&.active]:bg-black [&.active]:text-white md:flex-col md:w-16 md:h-16 md:justify-center'>
            <span className="material-symbols-outlined text-md hidden md:block">
                { icon }
            </span>
            <p className="leading-tight text-xs font-semibold">
                { label }
            </p>
        </NavLink>
    )
}