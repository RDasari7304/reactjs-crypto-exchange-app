import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
  } from '@headlessui/react'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
  
  const navigation = [
    { name: 'Profile', href: '/', current: true },
    { name: 'Buy Crypto', href: '/trade-crypto', current: false },
    { name: 'Prices', href: '/prices', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Navbar() {
    return (
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="min-w-full px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className='navbar-title mr-16'>Coinbase</p>
                    <div className="vertical-divider"></div>

                  </div>
                  <div className="hidden sm:ml-16 sm:block mt-auto mb-auto">
                    <div className="flex space-x-4">
                        {navigation.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                'text-gray-500 hover:bg-gray-100 hover:text-black',
                                'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            >
                            {item.name}
                            </a>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-1 pt-1 pb-1 ml-auto"> 
                        <button className='buy-crypto-button text-md ml-auto mr-6'> Buy Crypto </button>
                        <button className='trade-crypto-button text-md button-border' style={{'color': '#1E2026', 'padding': '0px 30px', 'borderRadius': '5px', 'fontSize': '14px', 'fontFamily': 'Arial, sans-serif', 'fontWeight': '600'}}> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        </button>
                  
                  </div>
                </div>
                
              </div>
            </div>
  
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        'text-gray-500 hover:bg-gray-100 hover:text-black',
                        'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    )
  }