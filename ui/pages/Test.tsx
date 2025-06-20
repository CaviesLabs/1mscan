import { useEffect } from "react"
import { useConnectors } from "wagmi"

const X = () => {
  useEffect(() => {
    console.log("mounted")
    return () => {
      console.log("unmounted")
    }
  }, [])
  return <>xx</>
}
const TestPage = () => {
  // const [a, setA] = useState<boolean>();
  // return (
  //   <div>
  //     <Skeleton w={10} h={10}>
  //       aaaaa
  //     </Skeleton>
  //     {a}

  //     <button onClick={() => setA((e) => !e)}>click</button>
  //     {/* {a ? (
  //       <X></X>
  //     ) : (
  //       <div color="red">
  //         <X></X>
  //       </div>
  //     )} */}
  //     {_.chain(undefined)
  //       .thru(() => {
  //         console.log("thru");
  //         return <X></X>;
  //       })
  //       .thru((v) => v)
  //       .value()}
  //   </div>
  // );

  const connectors = useConnectors()
  console.log(connectors)
  return <button type="button"></button>
}

export default TestPage
