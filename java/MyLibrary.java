public class MyLibrary {
    public static String getGreeting(String name) {
        return "Hello, " + name + "!";
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("No method specified");
            return;
        }

        String method = args[0];

        switch (method) {
            case "getGreeting":
                if (args.length != 2) {
                    System.out.println("Usage: getGreeting <name>");
                    return;
                }
                System.out.println(getGreeting(args[1]));
                break;

            case "add":
                if (args.length != 3) {
                    System.out.println("Usage: add <a> <b>");
                    return;
                }
                int a = Integer.parseInt(args[1]);
                int b = Integer.parseInt(args[2]);
                System.out.println(add(a, b));
                break;

            default:
                System.out.println("Unknown method: " + method);
                break;
        }
    }
}
