import React from "react";

export default function Features() {
  return (
    <section className="flex flex-col gap-12 w-full pt-16 pb-32 px-16 bg-secondary text-secondary-foreground">
      <h2 className="h2 max-w-[50%]">What Does Japanese Reader&nbsp;Do?</h2>
      <div className="grid grid-cols-2 gap-y-24 gap-x-16 items-center">
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">Grades by JLPT Level</h3>
          <p className="p1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
            velit maximus, molestie est a, tempor magna.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">Creates Vocabulary Lists</h3>
          <p className="p1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
            velit maximus, molestie est a, tempor magna.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">Makes Reading Easier</h3>
          <p className="p1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
            velit maximus, molestie est a, tempor magna.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">More Features Coming Soon</h3>
          <p className="p1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
            velit maximus, molestie est a, tempor magna.
          </p>
        </div>
      </div>
    </section>
  );
}
