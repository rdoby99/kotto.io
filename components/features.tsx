import React from "react";

export default function Features() {
  return (
    <section className="flex flex-col gap-8 md:gap-12 w-full py-16 md:pb-28 px-8 md:px-16 text-center">
      <h2 className="h2v text-left text-foreground">
        What Does Kotto.io&nbsp;Do?
      </h2>
      <div className="grid md:grid-cols-3 gap-y-8 md:gap-y-24 gap-x-16 items-top">
        <div className="col-span-1 flex flex-col gap-4 feature__card">
          <h3 className="h3">Creates Vocabulary Lists</h3>
          <p className="p1">
            Turn stories, news, emails, and more into vocabulary lists in
            seconds. The best part is these lists can be downloaded and imported
            into popular flashcard apps like Anki.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4 feature__card">
          <h3 className="h3">Makes Reading Easier</h3>
          <p className="p1">
            Gone are the days of interrupting your reading to search for words
            in a dictionary. Now, all the necessary vocabulary is pre-generated
            for convenient access.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4 feature__card">
          <h3 className="h3">More Features Coming Soon</h3>
          <p className="p1">This is just the beginning!</p>
        </div>
      </div>
    </section>
  );
}
