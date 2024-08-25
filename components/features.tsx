import React from "react";

export default function Features() {
  return (
    <section className="flex flex-col gap-12 w-full py-16 md:pb-28 px-8 md:px-16 bg-secondary text-secondary-foreground text-center">
      <h2 className="h2">What Does Kotto.io&nbsp;Do?</h2>
      <div className="grid md:grid-cols-3 gap-y-12 md:gap-y-24 gap-x-16 items-top">
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">Creates Vocabulary Lists</h3>
          <p className="p1">
            Turn stories, news, emails, and more into vocabulary lists in
            seconds. The best part is these lists can be downloaded and imported
            into popular flashcard apps like Anki.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">Makes Reading Easier</h3>
          <p className="p1">
            The days of having to stop reading to search a word in the
            dictionary are gone. Now all the necessary vocabulary is
            pre-generated for easy access.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="h3">More Features Coming Soon</h3>
          <p className="p1">This is just the beginning!</p>
        </div>
      </div>
    </section>
  );
}
