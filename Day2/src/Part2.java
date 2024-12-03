import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Part2 {
    public static void main(String[] args) {
        int numSafe = 0;

        try {

            File inputFile = new File("src/input.txt");
            Scanner myReader = new Scanner(inputFile);


            while (myReader.hasNextLine()) {
                String line = myReader.nextLine();
                String[] numbers = line.split("\\s+");

                List<Integer> level = new ArrayList<>();
                for (String number : numbers) {
                    level.add(Integer.parseInt(number));
                }

                boolean isSafe = checkSafe(level);
                if (isSafe) numSafe++;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(numSafe);
    }

    public static boolean checkSafe(List<Integer> level) {
        if (level.size() < 2) return true;


        int increasingCount = 0, decreasingCount = 0;
        for (int i = 0; i < level.size() - 1; i++) {
            if (level.get(i) < level.get(i + 1)) increasingCount++;
            if (level.get(i) > level.get(i + 1)) decreasingCount++;
        }
        boolean increasing = increasingCount >= decreasingCount;


        if (isSafeWithoutRemoval(level, increasing)) {
            return true;
        }


        for (int i = 0; i < level.size(); i++) {
            List<Integer> copy = new ArrayList<>(level);
            copy.remove(i);
            if (isSafeWithoutRemoval(copy, increasing)) {
                return true;
            }
        }

        return false;
    }

    private static boolean isSafeWithoutRemoval(List<Integer> level, boolean increasing) {
        for (int i = 0; i < level.size() - 1; i++) {
            int diff = level.get(i + 1) - level.get(i);
            if (increasing) {
                if (diff <= 0 || diff > 3) return false;
            } else {
                if (diff >= 0 || -diff > 3) return false;
            }
        }
        return true;
    }
}
