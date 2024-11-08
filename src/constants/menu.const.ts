interface MenuItem {
  label: string;
  icon?: string;
  to: string
}

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    to: '/dashboard'
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    to: '/settings'
  },
  {
    label: 'Invoices',
    icon: 'pi pi-credit-card',
    to: '/invoices'
  },
  {
    label: 'Incoming Funds',
    icon: 'pi pi-plus-circle',
    to: '/incoming-funds'
  },
  {
    label: 'Currency converter',
    icon: 'pi pi-arrow-right-arrow-left',
    to: '/currency-converter'
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out'
  }
]
