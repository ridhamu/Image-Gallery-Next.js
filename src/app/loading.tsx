import { Spinner } from "@/components/bootstrap";

export default function Loading() {
  return <Spinner animation="border" className="d-block m-auto" />; //this bootstrap sytle make the Spinner a block element and center (auto)
}
