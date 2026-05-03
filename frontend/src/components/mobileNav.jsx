import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", location: "/dashboard" },
  { name: "Add Expenses", location: "/addExpense" },
  { name: "Expenses", location: "/expenses" },
  { name: "Insights", location: "/insights" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileNav() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <Disclosure
      as="nav"
      className="relative lg:hidden bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt="user"
                  src="https://img.magnific.com/premium-vector/animator-vector-character-flat-style_1033579-57808.jpg?w=360"
                  className="size-9 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
              >
                <div className="text-center">
                  {token ? (
                    <div>
                    <p className="text-sm font-medium text-gray-500 pt-2 capitalize">
                      Hello, {JSON.parse(localStorage.getItem("user"))}
                    </p>
                    <p className="text-xs text-gray-500/70 pb-2">{new Date().toDateString()}</p>
                  </div>
                  ) : (
                    <p className="text-sm font-medium text-gray-500 py-3">
                      Hello, Guest
                    </p>
                  )}
                </div>
                <MenuItem>
                  {token ? (
                    <button
                      onClick={()=>{
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                        navigate("/login")
                      }}
                      className="w-full text-center block px-4 py-2 text-sm font-bold text-gray-700 data-focus:bg-black/10 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 cursor-pointer"
                    >
                      Sign out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="w-full text-center block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-black/10 cursor-pointer"
                    >
                      Sign In
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="button"
              onClick={() => navigate(item.location)}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                path === item.location
                  ? "bg-gray-900 text-white dark:bg-gray-950/50"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium cursor-pointer w-full text-left",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
