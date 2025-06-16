import MenusDetails from "@/modules/menus/MenusDetails";



export default function MenuDetailsClient({ menuItem }:any) {


  return (
    <>
      {/* Price and Quantity */}
      <MenusDetails menuItem={menuItem}/>
    </>
  )
}
