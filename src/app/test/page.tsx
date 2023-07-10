import List from "@/solver/list";

const Page = () => {
    const list = new List<string>();
    list.push("hello");
    list.push("world");
    console.log(list.toArray());
    list.pop();
    list.push("werner");
    console.log(list.toArray());
    list.remove("hello");
    console.log(list.toArray());
    list.push("axu");
    list.push("pp");
    list.push("pooppooo");
    console.log(list.toArray());
    list.removeAt(2);
    console.log(list.toArray());
    list.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0);
    });
    console.log(list.toArray());

    list.fromArray(["werner", "and", "axu", "are", "bestis"]);
    console.log(list.toArray());
    console.log(list.get(1));
    console.log(list.get(2));
    console.log(list.get(3));
    console.log(list.get(4));
    console.log(list.get(5));
    console.log(list.get(6));
    console.log(list.get(7));

    return <div>page</div>;
};

export default Page;
