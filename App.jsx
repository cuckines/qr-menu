import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const menu = {
  "do-an": [
    { id: 1, name: "Phở Bò", price: "50,000đ" },
    { id: 2, name: "Cơm Tấm", price: "45,000đ" },
  ],
  "do-uong": [
    { id: 3, name: "Trà Đào", price: "25,000đ" },
    { id: 4, name: "Cafe Sữa", price: "30,000đ" },
  ],
  "do-trang-mieng": [
    { id: 5, name: "Chè Thái", price: "20,000đ" },
    { id: 6, name: "Bánh Flan", price: "15,000đ" },
  ]
};

export default function QRMenuApp() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleOrder = () => {
    if (selectedItems.length > 0) {
      setOrderSuccess(true);
      setSelectedItems([]);
      setTimeout(() => setOrderSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Thực Đơn Nhà Hàng</h1>
      <Tabs defaultValue="do-an">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="do-an">Đồ Ăn</TabsTrigger>
          <TabsTrigger value="do-uong">Đồ Uống</TabsTrigger>
          <TabsTrigger value="do-trang-mieng">Tráng Miệng</TabsTrigger>
        </TabsList>

        {Object.entries(menu).map(([key, items]) => (
          <TabsContent value={key} key={key}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={\`cursor-pointer hover:shadow-lg transition-all duration-200 \${selectedItems.find((i) => i.id === item.id) ? "border-green-500 border-2" : ""}\`}
                  onClick={() => toggleItem(item)}
                >
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-6 text-center">
        <Button onClick={handleOrder} disabled={selectedItems.length === 0}>
          Đặt Món ({selectedItems.length})
        </Button>
        {orderSuccess && (
          <div className="mt-4 text-green-600 flex justify-center items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Đặt món thành công!
          </div>
        )}
      </div>
    </div>
  );
}
