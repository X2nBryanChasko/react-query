//impimenting optimistic updates with 3 callbacks
// onMutate, onError, onSettled

import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,

    {
      onSuccess,
      onError,
    }
  );
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    //onMutate is called before the mutation is fired and receives the same variables as the mutation function
    //in ourcase, the new hero we want to add as newHero
    // we'll cancel outgoing refetches so they dont overwrite our optimistic update, via cancelAueries
    // from queryClient . We'll need to make our onmutate function asynchronous for await to be allowed
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            //when we are getting new heroes, we've defined the name and alter ego but not id
            // so we'll set an id for each newhero object returned, giving us just a
            //sequential number, which is not a replacement for a true UUID
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      //  return an object with our previous hero data, to rollback mutations in case the post errors out
      return {
        previousHeroData,
      };
    },

    // define onError callback, with 3 arguments. the error that we encountered, the variables passed into mutation (hero name, alter ego), and
    // context which contains additional mutaiton information. we're only using the later to execute a callback
    //when there is an error, and will put _ in front of the first 2 arguments to ignore them.
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    //call when successful or error, to refetch the superheroes
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    /* onSuccess: (data) => {
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,

          data: [...oldQueryData.data, data.data],
        };
      });
    }, */
  });
};
