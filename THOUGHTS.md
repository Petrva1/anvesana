# The thought process

When creating the search demo, I've tried to find the balance between efficiency and thoroughness. I'm well aware that a few aspects of this demo could be done better, but for the sake of saving time, I've opted not to do them, as they would mainly serve to make future edits to the code easier.

The tool is made to be fully accessible by using the keyboard. (using the TAB key to run through the focusable elements)

## Styling
For the styling of the app, I've gone for simplistic approach - There's no need to pick an extensive colour palette and making complex animation fade-ins and outs for a query search tool. Everything displayed is styled to be clear, intuitive, and to serve its purpose.

### Tailwind
I've used tailwind to handle styling, as it's very powerful and allows for a great deal of customisation. The developer can define custom themes, and the utility classes are very versatile too. Plus, the classnames are generated during build time, and thus do not affect runtime at all.

## The suggestions
Suggestions appear when focusing the search bar and are rendered dynamically to be of use to the user. I've had the idea of highlighting the part of the suggestion that the user has written into the search box, but it felt like a little detail to include. If I was to create it, it would be splitting the suggestion into substrings, and then making the matching part bold.

## The table
I've used the `shadcn` component library for the table. It's a highly versatile component library while being extremely lightweight, and if it saves time, why not use it? It's being used in combination with tanstack's table library, which is the go-to library when doing tables. It makes supporting sorting (and a lot of other cool things) very easy for the developer. All of the three fields I've included in the table are sortable alphabetically (asc/desc).

## Fetching data
I originally wanted to use the JSONPlaceholder API, but since it has very bad support for searching (the input text has to exactly match the field you're searching for, meaning you won't get a match for "Rick" if you typed in "rick"), I've decided for an alternative. The API being used is the public placeholder Rick and Morty API, which has better support for searching. I was also thinking of doing the search on frontend on the JSON api, but searching/filtering by name should always be done on backend. So, the tool searches through Rick and Morty characters.

There's a bunch of Character properties typed as `any`. Although this is a very bad practice and the type `any` should be used only in exceptions or during development, here, I couldn't find deep documentation of all of the fields, and since they're not used anyways, I've figured that typing them as `any` won't have any actual effect.

The Rick and Morty API has its own React client library, which you can use to make fetching its data even more comfortable. But I've opted to not to use it, as I wanted to treat the API as a generic one, so that's why I'm using tanstack's `react-query`, which is probably one of the most widespread ways to handle API requests. It handles the state of the request, allowing the developer to easily treat loading/error states, refetch the query, and more.

When setting up data fetching logic for a bigger project with a proper Open API documentation, I'd setup Orval to automatically generate hooks and requests for me, so there's the minimised risk of human error, and that I don't have to create a separate fetch logic for every query fired.

# Verdict
I'll happily answer any of your questions on the following interview. It's quite possible that I forgot to write about everything I had on my mind when coding this demo, but I'll be happy to discuss about whatever that could be improved, and how to theoretically make the demo better, if it was an end product.
